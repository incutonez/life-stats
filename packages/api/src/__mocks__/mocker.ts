/* eslint @typescript-eslint/no-explicit-any: 0 */ // --> OFF
/**
 * I wanted a way of being able to add markup to actual classes and be able to generate values by calling a function
 * MockValues, which will generate based on whatever class you've passed in, as long as you're using the MockValue
 * decorator on your properties.  Obviously you really shouldn't leave the MockValue decorator in your model for prod
 * code, but it helps when you need to do some testing and generate complex models.
 */
import "reflect-metadata";
import { faker } from "@faker-js/faker";

const MockKey = Symbol("mock");

type IMockDataType<T = object> = string | number | (() => unknown) | (new () => T);
type ClassConstructor<T extends object> = new () => T;

interface IMockOptions<T = object> {
	dataType: IMockDataType<T>;
	length?: number;
	/**
	 * This is to prevent infinite recursion... in case you reuse the class within the class as an association.  We need
	 * some indication of when to break out of the infinite recursion.  If this value is not provided, 2 is used.
	 */
	maxDepth?: number;
}

function MockValue<T = object>(dataType: IMockDataType<T> | IMockOptions<T>) {
	// If dataType is passed in as an object, let's use that, otherwise, let's create our object of just the dataType
	const options: IMockOptions<T> = typeof dataType === "object" && "dataType" in dataType ? dataType : {
		dataType,
	};
	return Reflect.metadata(MockKey, options);
}

function isClass<T extends object>(cls: any): cls is ClassConstructor<T> {
	return cls.toString().startsWith("class") && typeof cls === "function";
}

function updateDepth(cls: any, maxDepth = 2, isSet = false) {
	if (isSet) {
		// Let's make sure we set the maxDepth on the class, in case it's not set in other MockValue definitions
		cls.maxDepth ??= maxDepth;
		// Start the depth at the maxDepth value and count down
		if (cls.depth === undefined) {
			cls.depth = maxDepth;
		}
		else {
			cls.depth--;
		}
	}
	// We add 1 back in case we're in some outer loop, as we'll want siblings to have the same depth length
	else if (cls.depth !== cls.maxDepth) {
		cls.depth++;
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MockValues<T extends object>(cls: new () => T, options: any = {}) {
	// Once we've reached 0, that means we're at the end of traversing down, so let's bail
	if ((cls as any).depth === 0) {
		return;
	}
	const instance = new cls();
	const keys = Object.keys(instance);
	for (const key of keys) {
		let value: unknown;
		const { dataType, length, maxDepth = 2 } = Reflect.getMetadata(MockKey, instance, key) as IMockOptions;
		if (isClass(dataType)) {
			updateDepth(dataType, maxDepth, true);
			if (length) {
				const items = [];
				for (let i = 0; i < length; i++) {
					const item = MockValues(dataType, options);
					if (item) {
						items.push(item);
					}
				}
				value = items;
			}
			else {
				value = MockValues(dataType, options);
			}
			updateDepth(dataType, maxDepth);
		}
		else if (typeof dataType === "function") {
			value = dataType();
		}
		else {
			value = dataType;
		}
		if (value === undefined) {
			Reflect.deleteProperty(instance, key);
		}
		else {
			Reflect.set(instance, key, value);
		}
	}
	return instance;
}

class Child {
	@MockValue(faker.person.fullName)
	name: string;

	@MockValue({
		dataType: Child,
		length: 3,
	})
	children: Child[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Parent {
	@MockValue(faker.person.fullName)
	name: string;

	@MockValue({
		dataType: Child,
		length: 2,
		maxDepth: 3,
	})
	children?: Child[];
}

export class Configuration {
    apiKey;
    username;
    password;
    accessToken;
    basePath;
    baseOptions;
    formDataCtor;
    constructor(param = {}) {
        this.apiKey = param.apiKey;
        this.username = param.username;
        this.password = param.password;
        this.accessToken = param.accessToken;
        this.basePath = param.basePath;
        this.baseOptions = param.baseOptions;
        this.formDataCtor = param.formDataCtor;
    }
    isJsonMime(mime) {
        const jsonMime = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
        return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
    }
}

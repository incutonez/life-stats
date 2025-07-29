import { faker } from "@faker-js/faker";
import axios from "axios";
import { vi } from "vitest";

vi.mock("axios");
export const mockedAxios = vi.mocked(axios, true);
export const accessToken = faker.internet.jwt();
export const refreshToken = faker.internet.jwt();
export const expiresAt = faker.date.future().getTime();

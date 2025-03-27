import { VK } from "arctic";
import { generateState } from "arctic";

export const vk = new VK(clientId, clientSecret, redirectURI);

const state = generateState();

const url = await vk.createAuthorizationURL(state, ["email"]);

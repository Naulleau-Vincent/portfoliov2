import { api } from "./client";

export type ContactPayload = {
    name: string;
    email: string;
    subject: string;
    message: string;
    website?: string;
    captcha?: string;
};

export type ContactResponse = {
    ok: boolean;
    message?: string;
    error?: string;
};

export async function sendContact(payload: ContactPayload): Promise<ContactResponse> {
    return api.post<ContactResponse>("/contact", payload);
}

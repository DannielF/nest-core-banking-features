export class ResponseCreateClient {
  encodedKey: string;
  id: string;
  firstName: string;
  lastName: string;
  preferredLanguage: string;
  gender: string;
  _personalizados: Personalizados;
}

export class Personalizados {
  External_ID: string;
}

export class Client {
  private firstName: string;
  private lastName: string;
  private phoneNumber: string;
  private documentId: string;
  private email: string;
  private gender: string;
  private address: string;
  private preferredLanguage: string;
  private _personalizados: Personalizados;
}

class Personalizados {
  private External_ID: string;
}

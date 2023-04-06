export class CreateClientDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  documentId: string;
  email: string;
  gender: string;
  address: string;
  preferredLanguage: string;
  _personalizados: Personalizados;
}
class Personalizados {
  External_ID: string;
}

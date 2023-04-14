export class OnboardingClientDTO {
  firstName: string;
  lastName: string;
  documentId: string;
  email: string;
  gender: string;
  idProduct: string;
  holderType: string;
  _personalizados: Personalization;
}

class Personalization {
  External_ID: string;
}

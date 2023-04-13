import { Body, Controller, Post } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { OnboardingClientDTO } from './dto/onboarding-client.dto';

@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Post('client')
  createClient(@Body() request: OnboardingClientDTO) {
    return this.onboardingService.createClient(request);
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { SuperstitionsService } from './superstitions.service';

describe('SuperstitionsService', () => {
  let service: SuperstitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperstitionsService],
    }).compile();

    service = module.get<SuperstitionsService>(SuperstitionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

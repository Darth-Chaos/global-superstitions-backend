import { Test, TestingModule } from '@nestjs/testing';
import { SuperstitionsController } from './superstitions.controller';
import { SuperstitionsService } from './superstitions.service';

describe('SuperstitionsController', () => {
  let controller: SuperstitionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperstitionsController],
      providers: [SuperstitionsService],
    }).compile();

    controller = module.get<SuperstitionsController>(SuperstitionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourcesService } from './cources.service';
import { CreateCourceDto } from './dto/create-cource.dto';
import { UpdateCourceDto } from './dto/update-cource.dto';

@Controller('cources')
export class CourcesController {
  constructor(private readonly courcesService: CourcesService) {}

  @Post()
  create(@Body() createCourceDto: CreateCourceDto) {
    return this.courcesService.create(createCourceDto);
  }

  @Get()
  findAll() {
    return this.courcesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courcesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourceDto: UpdateCourceDto) {
    return this.courcesService.update(+id, updateCourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courcesService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GenreEntity } from './entities/genre.entity';

@Controller('api/genres')
@ApiTags('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: GenreEntity })
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: GenreEntity, isArray: true })
  findAll() {
    return this.genresService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: GenreEntity })
  findOne(@Param('id') id: string) {
    return this.genresService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: GenreEntity })
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genresService.update(id, updateGenreDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: GenreEntity })
  remove(@Param('id') id: string) {
    return this.genresService.remove(id);
  }
}

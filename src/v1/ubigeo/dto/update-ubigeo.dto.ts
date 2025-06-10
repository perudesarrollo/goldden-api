import { PartialType } from '@nestjs/swagger';
import { CreateUbigeoDto } from './create-ubigeo.dto';

export class UpdateUbigeoDto extends PartialType(CreateUbigeoDto) {}

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto.js';


@Controller('profiles')
export class ProfilesController {
    //@path: Get/profiles

    @Get()
    findAll(@Query('age') age: number) {
        return [age];
    }

    //@path: GET/profiles/:id

    @Get(':id')
    findOne(@Param('id') id: string) {
        return { id };
    }

    //@path: POST /profiles
    @Post()
    create(@Body() body: CreateProfileDto) {
        return {
            name: body.name,
            age: body.age,
        }

    }
}


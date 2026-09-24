import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';


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

    //@path: PUT 
    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() body: UpdateProfileDto) {

        return {
            id,
            ...body
        }
    }
}


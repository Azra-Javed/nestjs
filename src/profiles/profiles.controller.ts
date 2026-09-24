import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { ProfilesService } from './profiles.service.js';


@Controller('profiles')
export class ProfilesController {
    constructor(private ProfileService: ProfilesService) { }

    // GET /profiles

    @Get()
    findAll() {
        return this.ProfileService.findAll();
    }

    //GET /profiles/:id
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ProfileService.findOne(id);
    }

    //POST /profiles
    @Post()
    create(
        @Body() body: CreateProfileDto) {
        return this.ProfileService.create(body);
    }

}
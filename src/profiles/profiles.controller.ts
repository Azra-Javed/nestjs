import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, HttpException, NotFoundException } from '@nestjs/common';
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

        // throw new HttpException("profile not found", httpStatus.Not_Found);
        //throw new NotFoundException();
        try {
            return this.ProfileService.findOne(id);
        } catch (error: any) {
            // if(error instanceof DatabaseException)
            //     throw new NotFoundException();
            throw new NotFoundException(error.message)
        }

    }

    //POST /profiles
    @Post()
    create(
        @Body() body: CreateProfileDto) {
        return this.ProfileService.create(body);
    }

    //PUT /profiles/dfhd

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() body: UpdateProfileDto
    ) {
        return this.ProfileService.update(id, body);
    }

    //DELETE /profiles/:id

    @Delete(':id')
    delete(
        @Param('id') id: string
    ) {
        return this.ProfileService.delete(id);
    }

}
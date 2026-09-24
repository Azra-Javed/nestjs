import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProfileDto } from './dto/create-profile.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { error } from 'console';




@Injectable()
export class ProfilesService {
    private profiles = [
        {
            id: randomUUID(),
            name: "Azra Javed",
            description: "Full-stack developer interested in NestJS and backend development.",
        },
        {
            id: randomUUID(),
            name: "rafia javed",
            description: "Frontend developer working with React and TypeScript.",
        },
        {
            id: randomUUID(),
            name: "Sara Ahmed",
            description: "Backend developer focused on Node.js and APIs.",
        },
    ];

    //find all profiles

    findAll() {
        return this.profiles;
    }

    //find one profile
    findOne(id: string) {
        const profile = this.profiles.find((profile) => profile.id === id);
        if (!profile)
            throw new Error(`Profile with ID ${id} not found.`);

        return profile;
    }

    //create service
    create(body: CreateProfileDto) {
        const createdProfile = {
            id: randomUUID(),
            ...body
        }
        this.profiles.push(createdProfile);
        return createdProfile;
    }


    //update profile
    update(id: string, body: UpdateProfileDto) {
        const profile = this.profiles.find((profile) => profile.id === id);

        if (!profile) throw new NotFoundException("profile with not found for this id")

        profile.name = body.name;
        profile.description = body.description;

        return profile;
    }

    //delte profile
    delete(id: string) {
        return this.profiles.filter((profile) => profile.id !== id);
    }
}

import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';




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
        return this.profiles
    }

    //find one profile
    findOne(id: string) {
        return this.profiles.find((profile) => profile.id === id)
    }
}

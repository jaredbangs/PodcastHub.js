import { User } from '../models/user';
import { Repository } from './repository';

export class UserRepository extends Repository<User> {

    constructor(databaseName: string = "users") {
        super(databaseName, () => new User());
    }
   	
    public async findByEmail(email: string): Promise<User> {

        await this.db.createIndex({ // if does not exist
            index: {fields: ['email']}
        });

        const users = await this.findByRequest({
            selector: {
                email: {$eq: email}
            }
        });

        if (users.length === 1 && users[0] !== undefined) {
            return users[0];
        } else if (users.length === 0) {
            throw new Error('Not Found: ' + email);
        } else {
            throw new Error('More Than One Found: ' + email);
        }
	}
  
    public async loadCurrentUser(): Promise<User> {
     
        if (process.env.USER_EMAIL !== undefined) {
            
            try {

                const user = await this.findByEmail(process.env.USER_EMAIL); 

                return user;

            } catch {

                const user = new User();
                user.email = process.env.USER_EMAIL;
                
                if (process.env.USER_NAME !== undefined) {
                    user.name = process.env.USER_NAME;
                }

                await this.save(user);

                return user;
            }

        } else {
            throw new Error("USER_EMAIL environment variable undefined");
        }
    };

}
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@/auth/session';

const prisma = new PrismaClient();

export async function seed() {
    try {
        console.log('🌱 Starting database seed...');

        // Create admin user
        const adminEmail = 'admin@example.com';

        const existingAdmin = await prisma.user.findUnique({
            where: { email: adminEmail },
        });

        if (!existingAdmin) {
            const passwordHash = await hashPassword('admin123');

            const admin = await prisma.user.create({
                data: {
                    email: adminEmail,
                    passwordHash,
                    role: 'ADMIN',
                    name: 'Admin User',
                    bloodGroup: 'A_POSITIVE',
                },
            });

            // Create initial activity log
            await prisma.activityLog.create({
                data: {
                    userId: admin.id,
                    action: 'SIGN_UP',
                    ipAddress: '127.0.0.1',
                },
            });

            console.log('👤 Created admin user:', {
                email: admin.email,
                role: admin.role,
            });
        } else {
            console.log('👤 Admin user already exists, skipping...');
        }

        console.log('✅ Seed completed successfully');
    } catch (error) {
        console.error('❌ Seed error:', error);
        throw error;
    }
}

seed()
    .catch(error => {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

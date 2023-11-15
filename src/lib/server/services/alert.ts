import type { Prisma } from '@prisma/client';
import { db } from '../db';

// Create a new alert.
// Parameters:
// - data: The data for creating a new alert.
export async function createAlert({ data }: Prisma.AlertCreateArgs) {
    try {
        const existingAlert = await db.alert.findFirst({
            where: { originID: data.originID },
        });

	console.log(existingAlert);

        if (existingAlert) {
            // If it exists, update the existing alert.
            const updatedAlert = await db.alert.update({
                where: { id: existingAlert.id },
                data,
            });

            // Return the updated alert.
            return updatedAlert;
        } else {
            // Create a new alert using the provided data.
            const newAlert = await db.alert.create({
                data
            })

            // Return the newly created alert.
            return newAlert
        }

    } catch (error) {
        console.error('Error creating alert', error)
        throw new Error('Failed to create alert')
    }
}

// // Retrieve alerts based on specified criteria.
// // Parameters:
// // - orderBy: Optional sorting criteria.
// // - where: Optional filtering criteria.
// // - take: Optional number of records to retrieve.
// // - skip: Optional number of records to skip.
export async function getAlerts({
	orderBy = {},
	where = {},
	take = undefined,
	skip = undefined,
}: Prisma.AlertFindManyArgs = {}) {
	try {
		// Fetch alerts with the provided parameters.
		const alerts = await db.alert.findMany({
			orderBy,
			where,
			take,
			skip,
		});

		// Return the retrieved alerts.
		return alerts;
	} catch (error) {
		console.error('Error fetching alerts', error);
		throw new Error('Failed to fetch alerts');
	}
}

// Retrieve alerts based on specified criteria.
// Parameters:
// - cursor: Optional cursor for pagination.
// - orderBy: Optional sorting criteria.
// - where: Optional filtering criteria.
// - pageSize: Optional number of records to retrieve per page.
// export async function getAlerts({
//     cursor = undefined,
// 	orderBy = {},
// 	where = {},
//     pageSize = 10,
// }: Prisma.AlertFindManyArgs & {pageSize?: number, cursor?: string}) {
// 	try {
// 		// Fetch alerts with the provided parameters.
// 		const alerts = await db.alert.findMany({
// 			orderBy,
// 			where,
// 			take: pageSize,
//             cursor: cursor ? { createdAt: new Date(cursor) } : undefined
// 		});

// 		// Return the retrieved alerts.
// 		return alerts;
// 	} catch (error) {
// 		console.error('Error fetching alerts', error);
// 		throw new Error('Failed to fetch alerts');
// 	}
// }

// Toggle the archive status of an alert.
// Parameters:
// - alertId: The ID of the alert to toggle.
export async function toggleAlertArchiveStatus(alertId: string) {
    try {
        // Find the alert by ID.
        const alert = await db.alert.findUnique({
            where: {
                id: alertId,
            },
        });

        if (!alert) {
            throw new Error(`Alert with ID ${alertId} not found`);
        }

        // Update the archive status.
        const updatedAlert = await db.alert.update({
            where: {
                id: alertId,
            },
            data: {
                archived: !alert.archived,
            },
        });

        // Return the updated alert.
        return updatedAlert;
    } catch (error) {
        console.error('Error updating alert archive status', error);
        throw new Error('Failed to update alert archive status');
    }
}

const today = new Date();
today.setHours(0, 0, 0, 0); 

const tomorrow = new Date(today); 
tomorrow.setDate(tomorrow.getDate() + 1); 

// Archive all today unarchived alerts.
export async function archiveAllTodayAlerts() {
    try {
        // Update all today unarchived alerts to archived.
        const result = await db.alert.updateMany({
            where: {
                archived: false, // Filter to select unarchived alerts
                createdAt: {gte: today, lt: tomorrow}
            },
            data: {
                archived: true, // Update their archive status to archived
            },
        });

        const updatedCount = result.count; // Count of updated alerts

        if (updatedCount === 0) {
            console.log('No today unarchived alerts to archive.');
            return;
        }

        console.log(`Archived today ${updatedCount} unarchived alerts.`);
    } catch (error) {
        console.error('Error archiving today unarchived alerts', error);
        throw new Error('Failed to archive today unarchived alerts');
    }
}


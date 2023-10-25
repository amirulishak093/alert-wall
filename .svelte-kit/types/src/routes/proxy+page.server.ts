// @ts-nocheck
import { archiveAllTodayAlerts, getAlerts, toggleAlertArchiveStatus,  } from "$lib/server/services/alert";
import type { Actions } from "@sveltejs/kit";


export async function load() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
  
    const tomorrow = new Date(today); 
    tomorrow.setDate(tomorrow.getDate() + 1); 

    const alerts = await getAlerts({orderBy: {createdAt: 'desc'}, where: {createdAt: {gte: today, lt: tomorrow}}})
    return {alerts}
}

export const actions = {
    toggleOne: async ({request}: import('./$types').RequestEvent) => {
        const formData = await request.formData();

        const alertId = formData.get('alertId') as string;
        
        try {

            await toggleAlertArchiveStatus(alertId)

            return {
                success: true,
                status: 'Form is submitted'
            }

        } catch (error) {
            console.log(error)

            return {
                error
            }
        }

    },
    archiveAllTodayAlerts: async () => {
        try {
            await archiveAllTodayAlerts()

            return {
                success: true,
                status: 'Form is submitted'
            }

        } catch (error) {
            console.log(error)

            return {
                error
            }
        }

    },

};null as any as Actions;
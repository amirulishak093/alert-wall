import { archiveAllTodayAlerts, getAlerts, toggleAlertArchiveStatus,  } from "$lib/server/services/alert";
import type { Actions } from "@sveltejs/kit";


export async function load() {
const today = new Date();
const startOfToday = new Date(today);
startOfToday.setHours(0, 0, 0, 0);

const endOfToday = new Date(today);
endOfToday.setHours(23, 59, 59, 999);

  const alerts = await prisma.alert.findMany({
    where: {
      createdAt: {
      gte: startOfToday,
      lte: endOfToday,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return { alerts };
}

export const actions: Actions = {
    toggleOne: async ({request}) => {
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

}

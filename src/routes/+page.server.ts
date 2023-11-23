import { archiveAllTodayAlerts, getAlerts, toggleAlertArchiveStatus,  } from "$lib/server/services/alert";
import type { Actions } from "@sveltejs/kit";

export async function load() {
  const { start, end } = getDateRange(7);

  const alerts = await getAlerts({
    where: {
      createdAt: {
        gte: start,
        lt: end,
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

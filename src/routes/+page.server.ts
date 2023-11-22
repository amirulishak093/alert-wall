import { archiveAllTodayAlerts, getAlerts, toggleAlertArchiveStatus,  } from "$lib/server/services/alert";
import type { Actions } from "@sveltejs/kit";


export async function load() {
  const malaysiaTimezoneOffset = 8 * 60; // UTC+8 in minutes
  const currentUTC = new Date();
  const malaysiaTime = new Date(currentUTC.getTime() + (malaysiaTimezoneOffset * 60 * 1000));

  malaysiaTime.setHours(0, 0, 0, 0);

  const startOfDayMYT = new Date(malaysiaTime);
  const endOfDayMYT = new Date(startOfDayMYT);
  endOfDayMYT.setDate(startOfDayMYT.getDate() + 1);

  const startOfDayUTC = new Date(startOfDayMYT.getTime() - (malaysiaTimezoneOffset * 60 * 1000));
  const endOfDayUTC = new Date(endOfDayMYT.getTime() - (malaysiaTimezoneOffset * 60 * 1000));

  const alerts = await getAlerts({
    where: {
      createdAt: {
        gte: startOfDayUTC,
        lt: endOfDayUTC,
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

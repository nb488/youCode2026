import { findAllPopUps, findPopUpById, createPopUp, updatePopUp, deletePopUp, addVolunteerToPopUp } from "../models/popupModel";
import { getCoordinates } from "../utils/geolocation";
import { addResourceToPopUp, deleteResourcesByPopUpId } from "../models/resourceModel";

export async function findPopUpsService(city?: string, resource_type?: string) {
    const query: { city?: string; resource_type?: string } = {};
    if (city) query.city = city;
    if (resource_type) query.resource_type = resource_type;
    return await findAllPopUps(query);
}

export async function findPopUpByIdService(id: number) {
    const result = await findPopUpById(id);
    if (!result) throw new Error('Pop-up not found');
    return result;
}

interface CreatePopUpData {
    name: string;
    description: string;
    street_address: string;
    city: string;
    province: string;
    postal_code: string;
    time_start: string;
    time_end: string;
    volunteers_needed: number;
    organizer_id: number;
    resources: { name: string; type: number }[];
}

export async function createPopUpService(data: CreatePopUpData) {
    // const coordinates = await getCoordinates(data.street_address, data.city, data.province, data.postal_code);
    // TODO: replace with real geocoding later
    const coordinates = { latitude: 49.282729, longitude: -123.120738 };

    const { resources, ...popupData } = data;
    const popup = await createPopUp({
        ...popupData,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
    });
    let addedResources = [];
    for (const resource of resources) {
        const addedResource = await addResourceToPopUp(popup.popup_id, resource.name, resource.type);
        addedResources.push(addedResource);
    }
    return {
        ...popup,
        resources: addedResources
    }

}

export async function updatePopUpService(id: number, data: CreatePopUpData) {
    const popup = await findPopUpById(id);
    if (!popup) throw new Error('Popup not found'); 

    // const coordinates = await getCoordinates(data.street_address, data.city, data.province, data.postal_code);
     // TODO: replace with real geocoding later
     const coordinates = { latitude: 49.282729, longitude: -123.120738 };

    const { resources, ...popupData } = data;
    const updatePopUpResult = await updatePopUp(id, {
        ...popupData,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
    });
    // update resources
    await deleteResourcesByPopUpId(id);
    const addedResources = [];
    for (const resource of resources) {
        const addedResource = await addResourceToPopUp(id, resource.name, resource.type);
        addedResources.push(addedResource);
    }
    return {
        ...updatePopUpResult,
        resources: addedResources
    }
}

export async function deletePopUpService(id: number) {
    // delete resources first due to foreign key constraint
    await deleteResourcesByPopUpId(id);
    const result = await deletePopUp(id);
    if (result === 0) throw new Error('Pop-up not found');
}

export async function addVolunteerToPopUpService(id: number, volunteerData: { name: string; email: string; phone_number: string }) {
    const result = await addVolunteerToPopUp(id, volunteerData);
    if (result === null) throw new Error('Volunteer already exists for this pop-up');
}

import { findAllPopUps, findPopUpById, createPopUp, updatePopUp, deletePopUp } from "../models/popupModel";
import { getCoordinates } from "../utils/geolocation";
import { addResourceToPopUp, deleteResourcesByPopUpId } from "../models/resourceModel";

export function findPopUpsService(city?: string, resource_type?: string) {
    const query: { city?: string; resource_type?: string } = {};
    if (city) query.city = city;
    if (resource_type) query.resource_type = resource_type;
    return findAllPopUps(query);
}

export function findPopUpByIdService(id: number) {
    return findPopUpById(id);
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
    organizer_id: number;
    resources: { name: string; type: number }[];
}

export async function createPopUpService(data: CreatePopUpData) {
    const coordinates = await getCoordinates(data.street_address, data.city, data.province, data.postal_code);
    const { resources, ...popupData } = data;
    return await createPopUp({
        ...popupData,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
    });
}

export async function updatePopUpService(id: number, data: CreatePopUpData) {
    const coordinates = await getCoordinates(data.street_address, data.city, data.province, data.postal_code);
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
    return await deletePopUp(id);
}

// popup.test.ts
// Run with: npx ts-node popup.test.ts
// Make sure your server is running on port 3000 before running this file

const BASE_URL = 'http://localhost:3000/api';

let organizerId: number;
let popupId: number;
let volunteerId: number;

// ─── Helpers ────────────────────────────────────────────────────────────────

async function request(method: string, path: string, body?: any) {
    const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : null,
    });
    const data = await res.json();
    return { status: res.status, data };
}

function pass(label: string, data: any) {
    console.log(`  ✅ PASS: ${label}`);
    console.log(`     Response: ${JSON.stringify(data)}`);
}

function fail(label: string, expected: number, got: number, data: any) {
    console.log(`  ❌ FAIL: ${label}`);
    console.log(`     Expected status: ${expected}`);
    console.log(`     Got status:      ${got}`);
    console.log(`     Response: ${JSON.stringify(data)}`);
}

function expect(label: string, status: number, expectedStatus: number, data: any) {
    if (status === expectedStatus) pass(label, data);
    else fail(label, expectedStatus, status, data);
}

function section(title: string) {
    console.log(`\n${'─'.repeat(60)}`);
    console.log(`  ${title}`);
    console.log(`${'─'.repeat(60)}`);
}

// const email = "eva2@example.com"
// ─── Organizer Tests ─────────────────────────────────────────────────────────

async function testCreateOrganizer() {
    section('POST /organizers');
    const uniqueEmail = `evan_${Date.now()}_${Math.random().toString(36).slice(2)}@example.com`;

    // ✅ success
    const { status, data } = await request('POST', '/organizers', {
        name: 'Evan Thompson',
        email: uniqueEmail,
        phone_number: '555-7890',
        password: 'password123',
    });
    expect('201 on valid create', status, 201, data);
    if (status === 201) {
        organizerId = data.organizer_id;
        console.log(`     → organizer_id: ${organizerId}`);
    }

    // ❌ missing fields
    const r2 = await request('POST', '/organizers', { name: 'Test' });
    expect('400 on missing fields', r2.status, 400, r2.data);

    // ❌ duplicate email — reuse exact same email
    const r3 = await request('POST', '/organizers', {
        name: 'Evan Thompson',
        email: uniqueEmail,  // same variable, guaranteed duplicate
        password: 'password123',
    });
    expect('400 on duplicate email', r3.status, 400, r3.data);
}

async function testLoginOrganizer() {
    section('POST /organizers/login');

    // ✅ success
    const { status, data } = await request('POST', '/organizers/login', {
        email: 'lia@example.com',
        password: '123',
    });
    expect('200 on valid login', status, 200, data);

    // ❌ wrong password
    const r2 = await request('POST', '/organizers/login', {
        email: 'evelyn@example.com',
        password: 'wrongpassword',
    });
    expect('400 on wrong password', r2.status, 400, r2.data);

    // ❌ email not found
    const r3 = await request('POST', '/organizers/login', {
        email: 'notfound@example.com',
        password: 'password123',
    });
    expect('400 on email not found', r3.status, 400, r3.data);

    // ❌ missing fields
    const r4 = await request('POST', '/organizers/login', { email: 'evelyn@example.com' });
    expect('400 on missing fields', r4.status, 400, r4.data);
}

async function testGetOrganizer() {
    section('GET /organizers/:id');

    // ✅ success
    const { status, data } = await request('GET', `/organizers/${organizerId}`);
    expect('200 on valid get', status, 200, data);

    // ❌ not found
    const r2 = await request('GET', '/organizers/999999');
    expect('400 on not found', r2.status, 400, r2.data);
}

// ─── Popup Tests ─────────────────────────────────────────────────────────────

async function testCreatePopup() {
    section('POST /popups');

    // ✅ success
    const { status, data } = await request('POST', '/popups', {
        name: 'Cloth Fundraiser',
        description: 'Downtown donation hub',
        street_address: '750 Hornby St',   // Vancouver Art Gallery
        city: 'Vancouver',
        province: 'British Columbia',
        postal_code: 'V6Z2H7',
        time_start: '2026-04-05T09:00:00',
        time_end: '2026-04-05T17:00:00',
        organizer_id: organizerId,
        volunteers_needed: 4,
        resources: [
            { name: 'Blankets', type: 'Clothing' },
            { name: 'Canned Food', type: 'Food' },
        ],
    });
    expect('201 on valid create', status, 201, data);
    if (status === 201) {
        popupId = data.popup_id;
        console.log(`     → popup_id: ${popupId}`);
    }

    // ❌ missing fields
    const r2 = await request('POST', '/popups', { description: 'test', organizer_id: organizerId });
    expect('400 on missing fields', r2.status, 400, r2.data);

    // ❌ time_end before time_start
    const r3 = await request('POST', '/popups', {
        name: 'Test',
        description: 'test',
        street_address: '750 Hornby St',
        city: 'Vancouver',
        province: 'British Columbia',
        postal_code: 'V6Z2H7',
        time_start: '2026-04-05T17:00:00',
        time_end: '2026-04-05T09:00:00',
        organizer_id: organizerId,
        resources: [],
    });
    expect('400 on time_end before time_start', r3.status, 400, r3.data);

    // ❌ organizer not found
    const r4 = await request('POST', '/popups', {
        name: 'Test',
        description: 'test',
        street_address: '750 Hornby St',
        city: 'Vancouver',
        province: 'British Columbia',
        postal_code: 'V6Z2H7',
        time_start: '2026-04-05T09:00:00',
        time_end: '2026-04-05T17:00:00',
        organizer_id: 999999,
        resources: [],
    });
    expect('400 on organizer not found', r4.status, 400, r4.data);
}

async function testGetAllPopups() {
    section('GET /popups');

    // ✅ get all
    const { status, data } = await request('GET', '/popups');
    expect('200 on get all', status, 200, data);

    // ✅ filter by city
    const r2 = await request('GET', '/popups?city=Vancouver');
    expect('200 on city filter', r2.status, 200, r2.data);

    // ✅ filter by resource_type
    const r3 = await request('GET', '/popups?resource_type=Clothing');
    expect('200 on resource_type filter', r3.status, 200, r3.data);

    // ✅ filter by both
    const r4 = await request('GET', '/popups?city=Vancouver&resource_type=Clothing');
    expect('200 on both filters', r4.status, 200, r4.data);

    // ✅ no results
    const r5 = await request('GET', '/popups?city=Tokyo');
    expect('200 with empty array for no results', r5.status, 200, r5.data);
}

async function testGetPopupById() {
    section('GET /popups/:id');

    // ✅ success
    const { status, data } = await request('GET', `/popups/${popupId}`);
    expect('200 on valid get', status, 200, data);

    // ❌ not found
    const r2 = await request('GET', '/popups/999999');
    expect('400 on not found', r2.status, 400, r2.data);
}

async function testUpdatePopup() {
    section('PUT /popups/:id');

    // ✅ success
    const { status, data } = await request('PUT', `/popups/${popupId}`, {
        name: 'Updated Cloth Fundraiser',
        description: 'Updated description',
        street_address: '750 Hornby St',
        city: 'Vancouver',
        province: 'British Columbia',
        postal_code: 'V6Z2H7',
        time_start: '2026-04-05T10:00:00',
        time_end: '2026-04-05T17:00:00',
        organizer_id: organizerId,
        volunteers_needed: 5,
        resources: [{ name: 'Winter Jackets', type: 'Clothing' }],
    });
    expect('200 on valid update', status, 200, data);

    // ❌ popup not found
    const r3 = await request('PUT', '/popups/999999', {
        name: 'Updated Cloth Fundraiser',
        description: 'Updated description',
        street_address: '750 Hornby St',
        city: 'Vancouver',
        province: 'British Columbia',
        postal_code: 'V6Z2H7',
        time_start: '2026-04-05T10:00:00',
        time_end: '2026-04-05T17:00:00',
        volunteers_needed: 4,
        organizer_id: 999999,
        resources: [],
    });
    expect('400 on popup not found', r3.status, 400, r3.data);

    // ❌ time_end before time_start
    const r4 = await request('PUT', `/popups/${popupId}`, {
        name: 'Updated Cloth Fundraiser',
        description: 'test',
        street_address: '750 Hornby St',
        city: 'Vancouver',
        province: 'British Columbia',
        postal_code: 'V6Z2H7',
        time_start: '2026-04-05T17:00:00',
        time_end: '2026-04-05T09:00:00',
        organizer_id: organizerId,
        volunteers_needed: 4,
        resources: [],
    });
    expect('400 on time_end before time_start', r4.status, 400, r4.data);
}

// ─── Volunteer Tests ──────────────────────────────────────────────────────────

async function testAddVolunteer() {
    section('POST /popups/:id/volunteers');

    // ✅ success
    const { status, data } = await request('POST', `/popups/${popupId}/volunteers`, {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        phone_number: '555-1234',
    });
    expect('201 on valid signup', status, 201, data);
    if (status === 201) {
        volunteerId = data.volunteer_id;
        console.log(`     → volunteer_id: ${volunteerId}`);
    }

    // ✅ no phone number
    const r2 = await request('POST', `/popups/${popupId}/volunteers`, {
        name: 'Bob Smith',
        email: 'bob@example.com',
    });
    expect('201 without phone number', r2.status, 201, r2.data);

    // ❌ already signed up
    const r3 = await request('POST', `/popups/${popupId}/volunteers`, {
        name: 'Alice Johnson',
        email: 'alice@example.com',
    });
    expect('400 on duplicate signup', r3.status, 400, r3.data);

    // ❌ missing fields
    const r4 = await request('POST', `/popups/${popupId}/volunteers`, { name: 'Test' });
    expect('400 on missing email', r4.status, 400, r4.data);

    // ❌ popup not found
    const r5 = await request('POST', '/popups/999999/volunteers', {
        name: 'Charlie',
        email: 'charlie@example.com',
    });
    expect('400 on popup not found', r5.status, 400, r5.data);
}


// ─── Delete Popup Test ────────────────────────────────────────────────────────

async function testDeletePopup() {
    section('DELETE /popups/:id');

    // ✅ success
    const { status, data } = await request('DELETE', `/popups/${popupId}`);
    expect('200 on valid delete', status, 200, data);

    // ❌ already deleted
    const r2 = await request('DELETE', `/popups/${popupId}`);
    expect('400 on already deleted', r2.status, 400, r2.data);
}

async function testGetPopupsByOrganizer() {
    section('GET /organizers/:id/popups');

    // ✅ success
    const { status, data } = await request('GET', `/organizers/${organizerId}/popups`);
    expect('200 on valid get', status, 200, data);

    // ❌ organizer not found
    const r2 = await request('GET', '/organizers/999999/popups');
    expect('400 on not found', r2.status, 400, r2.data);
}

// ─── Run All Tests ────────────────────────────────────────────────────────────

async function runAll() {
    console.log('\n🚀 Running GoPopup API Tests...\n');
    try {
        await testCreateOrganizer();
        await testLoginOrganizer();
        await testGetOrganizer();
        await testCreatePopup();
        await testGetAllPopups();
        await testGetPopupById();
        await testGetPopupsByOrganizer(); 
        await testUpdatePopup();
        await testAddVolunteer();
        await testDeletePopup();
        console.log('\n✅ All tests complete!\n');
    } catch (err) {
        console.error('\n💥 Test runner crashed:', err);
    }
}

runAll();
Create
- just store the offline data 
- need to assign temp id to the offline model


Update
-- Updating online data
- check whether has an existing offline update record
- if yes, update and override payload
- if no, create new update record


-- updating offline data
- override the payload in the initial creation request


Delete
-- deleting online data
- delete all the previous update
- create new delete record

-- deleting offline data
- delete all previous update
- delete the create record


Read
- need all online and offline data - merge 
- remove all deleted notes from the result


Need 2 tables - 
Note --- Request Queue


Tech stacks

Frontend:
- React
- Typescript
- mantine
- vite
- vite pwa plugin
- workbox

Backend:
- node
- express
- sqlite
- prisma
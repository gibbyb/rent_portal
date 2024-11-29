# Rent Portal

## Portal for tenants to pay rent

#### To Do:

- [ ] Fix First Sign In Form to reload auth session after updating user's name & pfp
    - [ ] Maybe add additional option to upload PFP
- [ ] Break Home Page into components
- [ ] Move necessary components from page to layout
- [ ] Add necessary pages & set up routing for each link
- [ ] Add all necessary tables to database schema.
- [ ] Write functions to access data from database
- [ ] Add Admin Portal to Avatar Popover, conditionally render based on user. (Probably email)

#### Questions:

- How will the data get into the database?
    - How will the portal know which property the user is renting?
        - Should the user select the property from a dropdown list? Probably not...
        - Admin Portal? Admin Privileges?
- Does the breadcrumb make sense? Will there be any nested pages?
    - If it doesn't, then what should go up there?
- What needs to be done before we can start building the dashboard?
    - Properties need to be tied to a user/users.
    - Payments & Payment Methods need to be tied to users.
    - Workorders need to be tied to users.

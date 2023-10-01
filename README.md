# roblox-open-cloud
TypeScript Library for interacting with the Roblox Open Cloud API.

# Example Usage
```ts
import { OpenCloudClient, OpenCloudApiKey } from '@voxelified/roblox-open-cloud';

const openCloud = new OpenCloudClient(new OpenCloudApiKey('your-api-key'));

// logs the first 100 badges that Blookerss has acquired.
const items = await openCloud.users.getInventoryItems(373020309, 100, 'badges=true');
console.log(items);
```
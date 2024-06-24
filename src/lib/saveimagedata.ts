// ImageDatabase.ts

export class ImageDatabase {
    private db: IDBDatabase | null = null;
    private dbName = 'imageDB';
    private storeName = 'images';

    constructor() {
        this.openDatabase();
    }

    private openDatabase(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);

            request.onerror = () => {
                console.error('IndexedDB error:', request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onupgradeneeded = event => {
                this.db = (event.target as IDBOpenDBRequest).result;
                if (!this.db!.objectStoreNames.contains(this.storeName)) {
                    this.db!.createObjectStore(this.storeName);
                }
            };
        });
    }

    public async storeImage(imageBlob: Blob, filename: string): Promise<void> {
        if (!this.db) {
            await this.openDatabase();
        }

        return new Promise<void>((resolve, reject) => {
            const transaction = this.db!.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.put(imageBlob, filename);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    public async getImage(filename: string): Promise<Blob | undefined> {
        if (!this.db) {
            await this.openDatabase();
        }

        return new Promise<Blob | undefined>((resolve, reject) => {
            const transaction = this.db!.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(filename);

            request.onsuccess = () => {
                const imageBlob: Blob = request.result;
                if (imageBlob) {
                    resolve(imageBlob);
                } else {
                    resolve(undefined);
                }
            };

            request.onerror = () => reject(request.error);
        });
    }
}

let imagedb: ImageDatabase | undefined;

if (typeof window !== 'undefined') {
    imagedb = new ImageDatabase();
}

export async function saveimage(imageBlob: Blob, filename: string): Promise<void> {
    await imagedb!.storeImage(imageBlob, filename);
    console.log('Image uploaded successfully!');
}

export async function fetchimage(filename: string): Promise<string | undefined> {
    console.log("Fetching image: " + filename);
    const imageBlob = await imagedb!.getImage(filename);
    if (imageBlob) {
        const imageUrl = URL.createObjectURL(imageBlob);
        return imageUrl;
    }
    return undefined; // Explicitly return undefined if no image is found
}

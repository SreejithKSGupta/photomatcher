// ImageDatabase.ts

export interface ImageRecord {
    id?: string;
    image: Blob;
  }
  
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
            this.db!.createObjectStore(this.storeName, { autoIncrement: true });
          }
        };
      });
    }
  
    public async storeImage(imageBlob: Blob): Promise<void> {
      if (!this.db) {
        await this.openDatabase();
      }
  
      return new Promise<void>((resolve, reject) => {
        const transaction = this.db!.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.add({ image: imageBlob });
  
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }
  
    public async getImage(id: string): Promise<Blob | undefined> {
      if (!this.db) {
        await this.openDatabase();
      }
  
      return new Promise<Blob | undefined>((resolve, reject) => {
        const transaction = this.db!.transaction([this.storeName], 'readonly');
        const store = transaction.objectStore(this.storeName);
        const request = store.get(id);
  
        request.onsuccess = () => {
          const imageRecord: ImageRecord = request.result;
          if (imageRecord) {
            resolve(imageRecord.image);
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
  

export async function saveimage(imageBlob: Blob): Promise<void> {
  console.log("Storing image locally...");
  await imagedb!.storeImage(imageBlob);
  console.log('Image uploaded successfully!');
}

export async function fetchimage(id: string): Promise<string | undefined> {
  const imageBlob = await imagedb!.getImage(id);
  if (imageBlob) {
    const imageUrl = URL.createObjectURL(imageBlob);
    return imageUrl;
  }
  return undefined;
}

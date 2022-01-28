import { child, get, getDatabase, limitToFirst, push, query, ref, update } from '@firebase/database';
import axios from 'axios';
import { firebaseApp } from '../../../..';
import { RegionType } from '../model/RegionType';
import { YoutubeCategory } from './_dto/YoutubeCategory';
import { YoutubeVideo } from './_dto/YoutubeVideo';

class YoutubeRepository {
  private generateCategoryKey(regionType: RegionType) {
    const db = getDatabase(firebaseApp, process.env.FIREBASE_DB2_URL);
    const path = `/data/youtube_suggestion/category`;

    return `${regionType}/${push(child(ref(db), path)).key}`;
  }

  async findAllCategories(regionType: RegionType): Promise<YoutubeCategory[]> {
    const database = getDatabase(firebaseApp, process.env.FIREBASE_DB2_URL);
    const path = `/data/youtube_suggestion/category/${regionType}`;
    const dbRef = ref(database);
    const snapshot = await get(query(child(dbRef, path), limitToFirst(1000)));

    let categories: YoutubeCategory[] = [];
    if (snapshot.exists()) {
      const obj = snapshot.val();
      if (obj === undefined) return categories;
      categories = Object.keys(obj).map(key => {
        return { key: `${regionType}/${key}`, regionType, ...obj[key] };
      });
    }

    return categories;
  }

  async findVideoList(categoryId: string): Promise<YoutubeVideo[]> {

    const database = getDatabase(firebaseApp, process.env.FIREBASE_DB2_URL);
    const path = `/data/youtube_suggestion/list/${categoryId}`;
    const dbRef = ref(database);
    const snapshot = await get(query(child(dbRef, path), limitToFirst(1000)));

    let videoList:YoutubeVideo[] = [];
    if (snapshot.exists()) {
      const obj = snapshot.val();
      if(obj === undefined) return videoList;
      videoList = Object.keys(obj).map(key => {
        return { id: key, ...obj[key] };
      });
    }

    return videoList;
  }

  async upsertCategory(data: YoutubeCategory) {
    const db = getDatabase(firebaseApp, process.env.FIREBASE_DB2_URL);
    const updates = {};

    const path = `/data/youtube_suggestion/category`;
    const key = (data.key === '' ? undefined : data.key) ?? this.generateCategoryKey(data.regionType);

    updates[`${path}/${key}`] = { ...data, key: null, regionType: null };

    return update(ref(db), updates);
  }

  async removeCategory(key: string, id: string) {
    const database = getDatabase(firebaseApp, process.env.FIREBASE_DB2_URL);
    const updates = {};

    const categoryPath = `/data/youtube_suggestion/category/${key}`;
    updates[categoryPath] = null;

    // remove category videos
    const listPath = `/data/youtube_suggestion/list/${id}`;
    updates[listPath] = null;

    update(ref(database), updates);
  }

  async upsertVideo(data: YoutubeVideo, categoryId: string) {
    const db = getDatabase(firebaseApp, process.env.FIREBASE_DB2_URL);
    const updates = {};

    const path = `/data/youtube_suggestion/list/${categoryId}`;
    const key = (data.id === '' ? undefined : data.id) ?? push(child(ref(db), path)).key;
    updates[`${path}/${key}`] = { ...data, id: null };

    return update(ref(db), updates);
  }

  async removeVideos(ids: string[], categoryId: string) {
    const db = getDatabase(firebaseApp, process.env.FIREBASE_DB2_URL);
    const updates = {};

    const path = `/data/youtube_suggestion/list/${categoryId}`;

    ids.forEach(id => {
      updates[`${path}/${id}`] = null;
    })

    update(ref(db), updates);
  }

  async findVideoUsingYoutubeApi(videoId: string): Promise<YoutubeVideo> {
    const uri = 'https://www.googleapis.com/youtube/v3/videos';

    const youtubeApiKey = process.env.YOUTUBE_API_KEY;

    const response = await axios.get(uri, {
      params: {
        id: videoId,
        key: youtubeApiKey,
        fields: 'items(snippet(title), snippet(thumbnails), snippet(channelTitle))',
        part: 'snippet',
      }
    });

    if(response.data.items.length === 0) {
      alert(`비디오 ID가 ${videoId}인 비디오를 찾을 수 없습니다.`);
    }

    const result = response.data.items[0].snippet;

    return {
      video_id: videoId,
      channel: result.channelTitle,
      thumbnail: result.thumbnails.standard.url,
      title: result.title,
    } as YoutubeVideo;
  }
}

export default new YoutubeRepository();



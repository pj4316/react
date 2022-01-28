import { YoutubeVideo } from '../repository/_dto/YoutubeVideo';

export class YoutubeVideoModel {
  id: string;
  videoId: string;
  channel: string;
  thumbnail: string;
  title: string;

  constructor(dto: YoutubeVideo) {
    this.id = dto.id;
    this.videoId = dto.video_id;
    this.channel = dto.channel;
    this.thumbnail = dto.thumbnail;
    this.title = dto.title;
  }

  static toDto(model: YoutubeVideoModel): YoutubeVideo {
    return {
      id: model.id,
      video_id: model.videoId,
      channel: model.channel,
      thumbnail: model.thumbnail,
      title: model.title,
    };
  }
}

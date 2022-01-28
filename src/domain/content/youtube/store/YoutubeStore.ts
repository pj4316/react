import { action, makeAutoObservable, observable, runInAction } from "mobx";
import { root } from "../../../..";
import { RegionType } from "../model/RegionType";
import { YoutubeCategoryModel } from "../model/YoutubeCategoryModel";
import { YoutubeVideoModel } from "../model/YoutubeVideoModel";
import YoutubeRepository from "../repository/YoutubeRepository";

export class YoutubeStore {
  @observable
  categories: YoutubeCategoryModel[] = [];

  @observable
  videos: YoutubeVideoModel[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action
  async findAllCategories(regionType: RegionType = RegionType.KR) {
    YoutubeRepository.findAllCategories(regionType).then((datas) => {
      runInAction(() => {
        this.categories = datas.map(data => new YoutubeCategoryModel(data));
      })
    }).catch((err) => {
      runInAction(() => {
        root.globalConfigStore.setAlert(`유튜브 카테고리 조회 중 문제가 발생했습니다. ${err}`, 'error');
      })
    })
  }

  @action
  async findAllVideos(categoryId: string) {
    YoutubeRepository.findVideoList(categoryId).then((datas) => {
      runInAction(() => {
        this.videos = datas.map(data => new YoutubeVideoModel(data));
      })
    }).catch((err) => {
      runInAction(() => {
        root.globalConfigStore.setAlert(`유튜브 카테고리${categoryId}의 비디오 목록 조회 중 문제가 발생했습니다. ${err}`, 'error');
      })
    });
  }

  @action
  async upsertCategory(model: YoutubeCategoryModel) {
    YoutubeRepository.upsertCategory(model).then(() => {
        runInAction(() => {
          root.globalConfigStore.setAlert('유튜브 카테고리 변경/추가를 성공했습니다', 'success');
          this.videos = [];
          this.findAllCategories();
        });
      },
    ).catch((err) => {
      console.error(model, err);
      root.globalConfigStore.setAlert(`유튜브 카테고리 변경/추가 중 문제가 발생했습니다. ${err}`, 'error');
    });
  }

  @action
  async removeCategory(category: YoutubeCategoryModel) {
    YoutubeRepository.removeCategory(category.key, category.id).then(() => {
      runInAction(() => {
        root.globalConfigStore.setAlert(`유튜브 카테고리 제거를 성공했습니다. ${category.id} `, 'success');
        this.findAllCategories();
      });
    }).catch((err) => {
      root.globalConfigStore.setAlert(`유튜브 카테고리 제거 중 문제가 발생했습니다. ${err}`, 'error');
    })
  }

  @action
  async upsertVideo(model: YoutubeVideoModel, categoryId: string) {
    YoutubeRepository.upsertVideo(YoutubeVideoModel.toDto(model), categoryId).then(() => {
        runInAction(() => {
          root.globalConfigStore.setAlert('유튜브 비디오 변경/추가를 성공했습니다', 'success');
          this.videos = [];
          this.findAllVideos(categoryId);
        });
      },
    ).catch((err) => {
        root.globalConfigStore.setAlert(`유튜브 비디오 변경/추가 중 문제가 발생했습니다. ${err}`, 'error');
      });
  }

  @action
  async removeVideos(ids: string[], categoryId: string) {
    YoutubeRepository.removeVideos(ids, categoryId).then(() => {
        runInAction(() => {
          root.globalConfigStore.setAlert(`유튜브 비디오 제거를 성공했습니다`, 'success');
          this.videos = [];
          this.findAllVideos(categoryId);
        });
      },
    ).catch((err) => {
      root.globalConfigStore.setAlert(`유튜브 비디오 제거 중 문제가 발생했습니다. ${err}`, 'error');
    });
  }

  @action
  findCategoryById(id: string) {
    return this.categories.find(it => it.id === id);
  }

  @action
  findVideoById(id: string) {
    return this.videos.find(it => it.id === id);
  }

  @action
  async findVideoUsingYoutubeApi(videoId: string) {
    return new YoutubeVideoModel(await YoutubeRepository.findVideoUsingYoutubeApi(videoId));
  }
}

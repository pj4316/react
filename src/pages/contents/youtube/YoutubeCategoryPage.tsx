import { Avatar, Box, Button, Chip, Container, styled, Tab, Tabs } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import React, { ReactNode, useEffect, useState } from 'react';
import { RegionType, RegionTypes } from '../../../domain/content/youtube/model/RegionType';
import { YoutubeCategoryModel } from '../../../domain/content/youtube/model/YoutubeCategoryModel';
import { root } from '../../../index';
import DefaultPage from '../../DefaultPage';
import { UpsertYoutubeCategoryDialog } from './UpsertYoutubeCategoryDialog';
import { YoutubeVideoListDialog } from './YoutubeVideoListDialog';

const yesChip = <Chip label="O" color="info" size="small" variant="outlined"/>;
const noChip = <Chip label="X" color="error" size="small" variant="outlined"/>;

const columns: GridColDef[] = [
  {
    field: 'icon', headerName: '아이콘', width: 70, renderCell: (param) => {
      return <Avatar sx={{ bgcolor: param.row.color }} variant="rounded">{param.row.icon}</Avatar>;
    },
  },
  { field: 'id', headerName: 'ID', width: 160 },
  { field: 'index', headerName: '순서', type: 'number', width: 160 },
  {
    field: 'name', headerName: '제목', width: 480, valueGetter: (param) => {
      return param.row.name;
    },
  },
  { field: 'count', headerName: '카운트', type: 'number', width: 160 },
  {
    field: 'show', headerName: '활성화', type: 'boolean', width: 80, renderCell: (param) => {
      return param.row.show ? yesChip : noChip;
    },
  },
];

interface DefaultTablePageProps {
  breadcrumbs: ReactNode,
}

export const YoutubeCategoryPage = observer((props: DefaultTablePageProps) => {
  const store = root.youtubeStore;
  const { breadcrumbs } = props;

  useEffect(() => {
    store.findAllCategories();
  }, []);

  const [isNew, setIsNew] = useState<boolean>(false);
  const [openCategoryDetail, setOpenCategoryDetail] = useState<boolean>(false);
  const [openVideoList, setOpenVideoList] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<YoutubeCategoryModel | undefined>();
  const [selectedRegionTab, setSelectedRegionTab] = useState<number>(0);

  const update = () => {
    setOpenCategoryDetail(true);
    setIsNew(false);
  };

  const select = (row) => {
    if (row.id === 'trending') {
      root.globalConfigStore.setAlert(`유튜브 트렌드 비디오 목록은 유튜브에서 관리합니다.`, 'warning');
      return;
    }
    const selectedCategory = store.findCategoryById(row.id);
    if (selectedCategory === undefined) return;
    setSelectedRow(selectedCategory);
  };

  const onClose = () => {
    setOpenVideoList(false);
    setOpenCategoryDetail(false);
    setSelectedRow(undefined);
  };

  const create = () => {
    setOpenCategoryDetail(true);
    setSelectedRow({ count:0, index:0, regionType: RegionTypes.getValue(selectedRegionTab) } as YoutubeCategoryModel);
    setIsNew(true);
  };

  const selectTab = (event, value) => {
    setSelectedRegionTab(value);
    setSelectedRow(undefined);
    store.findAllCategories(RegionTypes.getValue(value));
  };

  const remove = async () => {
    if(!selectedRow) {
      return;
    }

    await store.removeCategory(selectedRow);
    setSelectedRow(undefined);
  }

  return (<DefaultPage title={'유튜브 큐레이션'} breadcrumbs={breadcrumbs}>
    <ContentContainer>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedRegionTab} onChange={selectTab}>
          {Object.values(RegionType).map((value, index) => {
            return <Tab key={`tab-${index}`} label={value} value={index}/>;
          })}
        </Tabs>
      </Box>
      <DataGrid
        rows={toJS(store.categories).sort((a, b) => a.index > b.index ? 1 : -1)}
        columns={columns}
        onRowClick={(row) => select(row)}
        components={{
          Toolbar: GridToolbar,
        }}
        hideFooterSelectedRowCount
      />
      <ContentTail>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {selectedRow !== undefined ?
            <Button variant={'contained'} color={'error'} onClick={() => remove()}>삭제</Button> : null}
          {selectedRow !== undefined ?
            <Button variant={'contained'} color={'success'} onClick={() => update()}>수정</Button> : null}
          <Button variant={'contained'} color={'success'} onClick={() => create()}>추가</Button>
        </Box>
        {selectedRow !== undefined ?
          <Button variant={'contained'} color={'success'} onClick={() => setOpenVideoList(true)}>카테고리
            상세</Button> : null}
      </ContentTail>
      {openVideoList && selectedRow !== undefined ?
        <YoutubeVideoListDialog category={selectedRow} onClose={onClose}/> : null}
      {openCategoryDetail && selectedRow !== undefined ?
        <UpsertYoutubeCategoryDialog isNew={isNew} initials={selectedRow} onClose={onClose}/> : null}
    </ContentContainer>
  </DefaultPage>);
});

const ContentContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  padding: 16,
  borderRadius: 16,
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
  gap: 8,
}));

const ContentTail = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  borderRadius: 16,
  gap: 8,
}));

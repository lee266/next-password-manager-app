/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
// with typescript
import { GetStaticProps, NextPage } from "next";
// translation
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// calendar
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

import useSWR, { useSWRConfig } from "swr";
import axios from 'axios';
import { DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/core';

import Alerts from '../components/molecules/Feedback/Alerts';
import AddFormDialog from '../components/molecules/Calendar/AddFormDialogs';
import SelectDataDialogs from '../components/molecules/Calendar/SelectDataDialogs';
import { MainLayout } from '../components/layouts/MainLayout2';
// format 
import {format} from 'date-fns'
// MUI 
import Box from "@mui/material/Box";
import { AlertColor} from "@mui/material/";

type calendarType = {
  locale: string
  alertOpen: boolean
}

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const getCalendarData = () => {
  const {data, error, isLoading, isValidating} = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/calendars/`
    , fetcher
  );
  console.log("data", data)
  console.log("error", error)
  console.log("isLoading", isLoading)
  console.log("isValidation", isValidating)

  return {
    calendarData: data,
    isLoading: isLoading,
    isError: error,
    isValidating: isValidating,
  }
}

// const updateCalendarData = () => {

// }

// const deleteCalendarData= async(calendarId:string) => {
//   const res = await axios.delete(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/calendars/`+calendarId);
//   console.log("res:", res);
//   return res
// }

const calendar: NextPage<calendarType> = ( props ) => {
  const { t } = useTranslation();
  const { mutate } = useSWRConfig();
  const { calendarData } = getCalendarData();
  const baseUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/calendars/`
  // // Alert States
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<AlertColor>("info");
  const [alertMessage, setAlertMessage] = useState<string>("");
  // // Dialogs
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);
  const [defaultStart, setDefaultStart] = useState<string|Date>("");
  const [defaultEnd, setDefaultEnd] = useState<string|Date>("");
  const [selectDialogOpen, setSelectDialogOpen] = useState<boolean>(false);
  const [calendarId, setCalendarId] = useState<string>("");
  const [eventData, setEventData] = useState({});

  // const handleDetailEvent= async(info: EventClickArg) => {
  //   try {
  //     console.log("- data click(this is event Click)");
  //     console.log("event: ", info.event)
  //     console.log("el:", info.el)
  //     console.log("jsEvent", info.jsEvent)
  //     console.log("view", info.view)
  //     setSelectDialogOpen(true)
  //     setCalendarId(info.event.id)
  //     setEventData(info.event)
  //     setAlertOpen(true)
  //     setSeverity("success")
  //     setAlertMessage(info.event.title+"の削除に成功しました。")
  //   }catch (error:any) {
  //     setAlertOpen(true)
  //     setSeverity("error")
  //     setAlertMessage(info.event.title+"の削除に失敗しました。")
  //   }
  // }
  
  const handleDateSelect = async(selectionInfo: DateSelectArg) => {
    console.log("- date click");
    console.log("start: ", selectionInfo.start);
    console.log("end: ", selectionInfo.end);
    console.log("startStr: ", selectionInfo.startStr);
    console.log("endStr: ", selectionInfo.endStr);
    console.log("allDay: ", selectionInfo.allDay);
    console.log("jsEvent: ", selectionInfo.jsEvent);
    console.log("view: ", selectionInfo.view);
    // console.log("Info: ", selectionInfo);
    setDefaultStart(format(selectionInfo.start, 'yyyy-MM-dd HH:mm'))
    setDefaultEnd(format(selectionInfo.end, 'yyyy-MM-dd HH:mm'))
    setAddDialogOpen(true)
  }

  return (
    <MainLayout>
      <Alerts
        alertOpen={alertOpen}
        alertMessage={alertMessage}
        setAlertOpen={setAlertOpen}
        severity={severity}
      /> 
      <AddFormDialog
        dialogOpen={addDialogOpen}
        setDialogOpen={setAddDialogOpen}
        mutate={mutate}
        url={baseUrl}
        defaultStart={defaultStart}
        defaultEnd={defaultEnd}
      />
      {/* <SelectDataDialogs
        dialogOpen={selectDialogOpen}
        setDialogOpen={setSelectDialogOpen}
        calendarId={calendarId}
        url={baseUrl}
        mutate={mutate}
        eventData={eventData}
      /> */}
      <Box
        sx={{
          height: '100vh'
        }}>
        <FullCalendar
          plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin ]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
          }}
          events={
            calendarData
          }
          height='90%'
          // stickyHeaderDates={true}
          initialView="dayGridMonth"
          selectable={true}
          unselectAuto={true}
          editable={true}
          nowIndicator={true}
          dayMaxEvents={true}  
          droppable={true} // drag and drop     
          locale={props.locale}
          timeZone={"local"}
          // eventClick={handleDetailEvent} 
          select={handleDateSelect}       // call this function when click date/time
          // eventDrop={handleDropEvent} // call this function when dragging stops and the event moved.
          // eventResize={handleResizeEvent} // call this function when change the event size. and this callback is fired before the eventChange callback is fired
        />
      </Box>
    </MainLayout>
  )
}


// const handleDropEvent = ( eventDropInfo: EventDropArg) => {
//   console.log("- Drop event");
//   console.log("info:", eventDropInfo);
// }

// const handleResizeEvent = (eventResizeInfo:EventResizeDoneArg) => {
//   console.log("- Resize event");
//   console.log("info:", eventResizeInfo);
// }
  

/**
 * locale: the value identifies and retrieves your country from URL(Sub-path Routing)
 * ex) if your route is localhost, the value is ja
 *     if your route is localhost/en, the value is en  
*/
export const getStaticProps: GetStaticProps = async({
  locale,
}) => {
  // please check log in docker password_next  if you want to see console.log
  console.log(locale);
  const translations = await serverSideTranslations(locale!, ["common"])
  return {
    props: {
      locale,
      ...translations
    },
  }
}

export default calendar;

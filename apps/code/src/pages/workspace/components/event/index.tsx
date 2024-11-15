import {
    Timeline,
    TimelineItem,
    TimelineHeader,
    TimelineTime,
    TimelineTitle,
    TimelineDescription,
} from "@/components/ui/timeline";
import dayjs from 'dayjs';

const timelineData: any[] = [
    {
        id: 1,
        title: '你',
        description:
            '创建任务"实现一个程序，每天定时搜集财经热点以及马斯克在X上的动态，整理并推送到我的微信，需要哪些步骤？"',
        time: dayjs('2024-11-14 17:55:00').fromNow(),
    },
    {
        id: 2,
        title: '楚留香',
        description:
            '分配"抓取财经网站数据"任务给陆小凤',
        time: dayjs('2024-11-14 18:00:00').fromNow(),
    },
    {
        id: 3,
        title: '楚留香',
        description:
            '分配"抓取X平台数据"任务给陆小凤',
        time: dayjs('2024-11-14 18:00:00').fromNow(),
    },
    {
        id: 4,
        title: '楚留香',
        description: '分配"编写微信推送"任务给陆小凤',
        time: dayjs('2024-11-14 18:00:00').fromNow(),
    },
    {
        id: 5,
        title: '系统',
        description: '等待验收...',
        time: dayjs().fromNow(),
    }
];

export default function Event() {
    return (
        <div className="flex flex-col p-2 h-full">
            <Timeline className='mt-8'>
                {timelineData.map((item) => (
                    <TimelineItem key={item.id}>
                        <TimelineHeader>
                            <TimelineTime className="w-24 text-xs">{item.time}</TimelineTime>
                            <TimelineTitle className="text-sm">
                                {item.title}
                            </TimelineTitle>
                        </TimelineHeader>
                        <TimelineDescription className="text-xs">{item.description}</TimelineDescription>
                    </TimelineItem>
                ))}
            </Timeline>
        </div>
    );
}
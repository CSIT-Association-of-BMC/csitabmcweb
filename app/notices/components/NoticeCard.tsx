"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Calendar, Download } from "lucide-react";
import { NoticeTypes } from "@/types/Notice";
import { getLocalDate } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const NoticeCardComponent = ({ notice }: { notice: NoticeTypes }) => {
  const router = useRouter();

  const handleCardClick = useCallback(() => {
    router.push(`/notices/${notice.documentId}`);
  }, [router, notice.documentId]);

  const handleDownload = useCallback(() => {
    if (notice.image && notice.image.length > 0 && notice.image[0].url) {
      const a = document.createElement("a");
      a.href = notice.image[0].url;
      a.download = "";
      a.click();
    }
  }, [notice.image]);

  return (
    <Card className="cursor-pointer" onClick={handleCardClick}>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="grid gap-1 h-14">
          <CardTitle>{notice.title}</CardTitle>
          <div className="text-sm text-muted-foreground line-clamp-2">
            <Markdown>{notice.description}</Markdown>
          </div>
        </div>
        <span className="ml-auto rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold capitalize text-slate-700">
          {notice.category}
        </span>
      </CardHeader>
      <CardContent>
        <Image
          src={
            notice.image &&
            notice.image.length > 0 &&
            notice.image[0].url !== ""
              ? (notice.image[0].url as string)
              : "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191383/logohero_nsqj8h.png"
          }
          width={800}
          height={400}
          alt={notice.title}
          className="rounded-lg border w-full h-48 object-contain"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-4 w-4" />
          {getLocalDate(notice.publishedAt)}
        </div>
        {notice.image && notice.image.length > 0 && notice.image[0].url ? (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleDownload();
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            Notice
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
};

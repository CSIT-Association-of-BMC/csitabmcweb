"use client";

import { useState } from "react";
import { NoticeTypes } from "@/types/Notice";
import { NoticeCardComponent } from "./NoticeCard";
import { SharedPagination } from "@/components/custom/SharedPagination";

interface NoticeListProps {
  notices: NoticeTypes[];
  itemsPerPage?: number;
}

export function NoticeList({ notices, itemsPerPage = 16 }: NoticeListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(notices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotices = notices.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {currentNotices.map((notice) => (
          <NoticeCardComponent key={notice.id} notice={notice} />
        ))}
      </div>

      <SharedPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

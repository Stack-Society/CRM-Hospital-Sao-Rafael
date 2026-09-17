import CallCenterLayout from "../../components/CallCenterLayout";

function Skeleton({ className = "" }) {
  return (
    <div
      className={`bg-gray-100 rounded-md animate-pulse ${className}`}
    />
  );
}
 
export default function LeadSkeleton() {
  return (
    <CallCenterLayout>
      <div className="px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Skeleton className="w-9 h-9 rounded-full" />
          <div>
            <Skeleton className="w-44 h-2.5 mb-1.5" />
            <Skeleton className="w-32 h-4" />
          </div>
        </div>
 
        <div className="bg-white border border-gray-100 w-full rounded-xl p-5 mb-3">
          <div className="flex items-start gap-4 mb-5">
            <Skeleton className="w-13 h-13 min-w-[52px] min-h-[52px] rounded-full" />
            <div className="flex-1">
              <Skeleton className="w-40 h-4 mb-2" />
              <Skeleton className="w-52 h-3 mb-1.5" />
              <Skeleton className="w-20 h-3" />
            </div>
            <div className="flex gap-1.5">
              <Skeleton className="w-9 h-5 rounded-full" />
              <Skeleton className="w-12 h-5 rounded-full" />
            </div>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="flex-1 h-16 rounded-lg" />
            ))}
          </div>
        </div>
 
        <div className="grid grid-cols-3 gap-2.5 mb-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[68px] rounded-lg" />
          ))}
        </div>
 
        <div className="grid grid-cols-2 gap-2.5">
 
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <Skeleton className="w-24 h-2.5 mb-4" />
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="w-full h-3 mb-2.5 last:mb-0" />
            ))}
          </div>
 
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <Skeleton className="w-20 h-2.5 mb-4" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-2.5 items-start mb-3.5 last:mb-0">
                <Skeleton className="w-2 h-2 rounded-full mt-1 shrink-0" />
                <div className="flex-1">
                  <Skeleton className="w-full h-3 mb-1.5" />
                  <Skeleton className="w-3/5 h-2.5" />
                </div>
              </div>
            ))}
          </div>
 
        </div>
      </div>
    </CallCenterLayout>
  );
}
import type { PostsReturn } from "@/api/posts/fetch";
import { Badge } from "@/components/ui/badge";
import { badgeVariants } from "@/components/ui/badge-variants";
import { Link } from "@/components/ui/link";
import UserProfile from "@/components/user-profile";
import { getFormattedDateWithAttribute } from "@/lib/utils";
import type { PostState } from "@/types";
import type { VariantProps } from "class-variance-authority";

const placeholderImgUrl = new URL("/placeholder_blogspot.webp", import.meta.url)
  .href;

type PostPreviewProps = {
  data: PostsReturn;
};

const STATE_BADGE_MAP: Record<
  Exclude<PostState, "all">,
  VariantProps<typeof badgeVariants>["variant"]
> = {
  draft: "tertiary",
  published: "default",
};

export default function PostPreview({ data }: PostPreviewProps) {
  const {
    id,
    title,
    email,
    username,
    pictureUrl,
    shortDescription,
    headerImageUrl,
    createdAt,
    state,
  } = data;
  const { formattedDate, attributeDate } =
    getFormattedDateWithAttribute(createdAt);
  return (
    <Link
      to={"/posts/$postId/edit"}
      size={"link"}
      params={{ postId: String(id) }}
      variant={"wrapper"}
      className="flex shadow-all-xl"
    >
      <article className="flex flex-wrap sm:flex-nowrap overflow-hidden min-h-60 lg:max-h-60 rounded-md">
        <div className="sm:basis-[45%] relative">
          <Badge
            className="absolute top-2 left-2 text-sm uppercase"
            variant={STATE_BADGE_MAP[state]}
          >
            {state}
          </Badge>
          <img
            className="object-cover h-full w-full"
            src={headerImageUrl || placeholderImgUrl}
            alt=""
          />
        </div>
        <section className="sm:basis-[55%] flex justify-between flex-col gap-6 p-6">
          <h2 className="text-xl font-semibold text-primary">{title}</h2>
          <p className="text-zinc-400 line-clamp-3">{shortDescription}</p>
          <div>
            <UserProfile
              data={{
                email,
                username,
                pictureUrl,
              }}
            >
              <time
                className="text-sm text-zinc-400/65"
                dateTime={attributeDate}
              >
                {formattedDate}
              </time>
            </UserProfile>
          </div>
        </section>
      </article>
    </Link>
  );
}

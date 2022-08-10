import type {
  LoreEntityFragmentFragment,
  LorePoiFragmentFragment,
} from '@/generated/graphql';
import { useGetLorePoisQuery } from '@/generated/graphql';
import { LoreMarkdownRenderer } from './LoreMarkdownRenderer';

type LoreScrollEntityProps = {
  placeholder?: string;
  entity: LoreEntityFragmentFragment;
};

export const LoreScrollEntity = ({ entity }) => {
  // const { data: pois, loading: poisLoading } = useGetLorePoisQuery();

  if (entity.revisions.length === 0) {
    return <div>No revision found</div>;
  }

  return (
    <>
      {entity.revisions[0].title ? (
        <h1 className={`text-6xl font-bold mb-6`}>
          {entity.revisions[0].title}
        </h1>
      ) : null}

      <LoreMarkdownRenderer>
        {entity.revisions[0].markdown}
      </LoreMarkdownRenderer>
    </>
  );
};

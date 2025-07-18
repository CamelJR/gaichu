// src/pages/CardDetailPage.tsx
import DOMPurify from "dompurify";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CollectionParams } from "../App";
import CardDetailPagingButton, {
  PagingType,
} from "../components/ButtonComponents/CardDetailPagingButton";
import { useCurrentAndAdjacentCards } from "../hooks/useCollectionCard";
import {
  getCardDetailPath,
  parseSortAndNameRegex,
} from "../utils/RoutePathBuildUtils";

const CardDetailPage: React.FC = () => {
  const { seriesShortName, setShortName, sortByAndCardName } =
    useParams<CollectionParams>();
  const navigate = useNavigate();

  const { sortBy, cardName } = parseSortAndNameRegex(sortByAndCardName ?? "");
  const { card, previousCard, nextCard, isLoading, error } =
    useCurrentAndAdjacentCards(
      seriesShortName ?? "",
      setShortName ?? "",
      sortBy ?? "",
      cardName ?? "",
    );

  if (error && isLoading === false)
    return (
      <div className="container mx-auto p-4">
        <p className="text-errorText text-center">Card not found.</p>
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex flex-col items-center md:w-1/3">
          <img
            src={card?.image}
            alt={card?.name}
            className="border-secondaryBorder mb-4 block max-h-[600px] rounded-3xl border-1 object-contain shadow"
          />
          <div className="mt-0 flex w-full max-w-xs gap-4">
            {previousCard && (
              <CardDetailPagingButton
                pagingType={PagingType.Previous}
                card={previousCard ? previousCard : undefined}
                onClick={() => {
                  navigate(getCardDetailPath(previousCard));
                }}
              />
            )}
            {nextCard && (
              <CardDetailPagingButton
                pagingType={PagingType.Next}
                card={nextCard ? nextCard : undefined}
                onClick={() => {
                  navigate(getCardDetailPath(nextCard));
                }}
              />
            )}
          </div>
        </div>
        <div className="md:w-2/3">
          <h2 className="mb-4 text-3xl">{card?.name}</h2>

          <table className="w-full border-collapse">
            <tbody>
              {card?.hp && (
                <tr>
                  <th className="py-2 pr-4 text-left">HP</th>
                  <td className="py-2">{card?.hp}</td>
                </tr>
              )}
              {card?.measurement && (
                <tr>
                  <th className="py-2 pr-4 text-left">Measurements</th>
                  <td className="py-2">
                    Height {card?.measurement?.height}, Weight{" "}
                    {card?.measurement?.weight}
                  </td>
                </tr>
              )}
              {card?.attacks?.map((attack, aIndex) => (
                <tr key={attack.name ?? aIndex}>
                  <th className="py-2 pr-4 text-left">{attack.name}</th>
                  <td className="py-2">
                    {(attack.costs ?? []).map((cost, cIndex) => (
                      <img
                        key={`${attack.name}-cost-${cIndex}`}
                        src={`https://gaichu.b-cdn.net/wm/icon${cost}.jpg`}
                        alt={`${cost} Icon`}
                        className="mr-2 mb-1 inline-block h-5 w-5 rounded-full align-middle"
                      />
                    ))}
                    {attack.effect} {attack.damage ? `(${attack.damage})` : ""}
                  </td>
                </tr>
              ))}
              {card?.type && (
                <tr>
                  <th className="py-2 pr-4 text-left">Type</th>
                  <td className="py-2">{card?.type}</td>
                </tr>
              )}
              {card?.limit && (
                <tr>
                  <th className="py-2 pr-4 text-left">Limit</th>
                  <td className="py-2">{card?.limit}</td>
                </tr>
              )}
              {card?.cost && (
                <tr>
                  <th className="py-2 pr-4 text-left">Cost</th>
                  <td className="py-2">
                    {card?.cost?.map((cost) => (
                      <span key={cost.aura} className="mr-2">
                        {cost.total}{" "}
                        <img
                          src={`https://gaichu.b-cdn.net/mz/icon${cost.aura}.jpg`}
                          alt={`${cost.aura} Icon`}
                          className="inline-block h-5 w-5 align-middle"
                        />
                        {"   "}
                      </span>
                    ))}
                  </td>
                </tr>
              )}
              {card?.effect && (
                <tr>
                  <th className="py-2 pr-4 text-left">Effect</th>
                  <EffectCell html={card?.effect} />
                </tr>
              )}
              <tr>
                <th className="py-2 pr-4 text-left">Flavor Text</th>
                <td className="py-2">{card?.description}</td>
              </tr>
              <tr>
                <th className="py-2 pr-4 text-left">Illustrator</th>
                <td className="py-2">{card?.illustrators[0]}</td>
              </tr>
              <tr>
                <th className="py-2 pr-4 text-left">Rarity</th>
                <td className="py-2">{card?.rarity}</td>
              </tr>
              <tr>
                <th className="py-2 pr-4 text-left">
                  <img
                    src={card?.sets[0].image}
                    alt={card?.sets[0].name}
                    className="w-24 rounded shadow"
                  />
                </th>
                <td className="py-2">
                  {card?.sets[0].name} • {card?.number}/
                  {card?.total_cards_count} • {card?.variant}
                  <div className="mt-2"></div>
                </td>
              </tr>
              {card?.note && (
                <tr>
                  <th className="py-2 pr-4 text-left">Note</th>
                  <td className="py-2">{card?.note}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
function EffectCell({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["img", "b", "i", "em", "strong", "u", "br"],
    ALLOWED_ATTR: ["src", "alt", "title", "width", "height", "style"],
  });
  return <td className="py-2" dangerouslySetInnerHTML={{ __html: clean }} />;
}
export default CardDetailPage;

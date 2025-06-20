// src/hooks/__tests__/getJsonSeries.test.ts
import { describe, expect, it, vi } from "vitest";
import { seriesJsonMock } from "../__mock__/seriesJson.ts";
import { setJsonMock } from "../__mock__/setJson.ts";

vi.mock("../../../data/series.json", () => ({
  default: seriesJsonMock,
}));
vi.mock("../../../data/sets.json", () => ({
  default: setJsonMock,
}));

import { getJsonSeries } from "../../services/JsonCollectionSeriesService.tsx";

describe("test for getJsonSeries", () => {
  const series = getJsonSeries();

  it("should sort Series by their sortBy value in ascending order", () => {
    // Confirm each series is sorted correctly by sortBy
    expect(
      series.every(
        (s, index) =>
          index === 0 || s.series.sortBy > series[index - 1].series.sortBy,
      ),
    ).toBe(true);
  });

  it("should connect Sets to the correct series and sort sets by sortBy", () => {
    series.forEach((s) => {
      // Each set should have the correct series_id
      expect(s.sets.every((set) => set.series_id == s.series.id)).toBe(true);

      // Sets should be sorted by sortBy in ascending order
      expect(
        s.sets.every(
          (set, index) => index === 0 || set.sortBy > s.sets[index - 1].sortBy,
        ),
      ).toBe(true);
    });
  });
});

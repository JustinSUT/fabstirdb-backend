const darkModeColors = [
  { label: 'Dark Slate Gray', value: '#1F2937' },
  { label: 'Dark Navy Blue', value: '#111827' },
  { label: 'Charcoal', value: '#374151' },
  { label: 'Dark Gray', value: '#4B5563' },
  { label: 'Gray', value: '#6B7280' },
  { label: 'Light Gray', value: '#9CA3AF' },
  { label: 'Very Light Gray', value: '#D1D5DB' },
  { label: 'Almost White', value: '#F3F4F6' },
  { label: 'White with a Tint', value: '#F9FAFB' },
  { label: 'Amber', value: '#D97706' },
  { label: 'Goldenrod', value: '#F59E0B' },
  { label: 'Golden Yellow', value: '#FBBF24' },
  { label: 'Light Yellow', value: '#FDE68A' },
  { label: 'Crimson', value: '#E11D48' },
  { label: 'Red', value: '#EF4444' },
  { label: 'Light Red', value: '#F87171' },
  { label: 'Soft Red', value: '#FCA5A5' },
  { label: 'Very Light Red', value: '#FECACA' },
  { label: 'Emerald Green', value: '#10B981' },
  { label: 'Green', value: '#34D399' },
  { label: 'Light Green', value: '#6EE7B7' },
  { label: 'Mint', value: '#A7F3D0' },
  { label: 'Very Light Mint', value: '#D1FAE5' },
  { label: 'Blue', value: '#3B82F6' },
  { label: 'Light Blue', value: '#60A5FA' },
  { label: 'Sky Blue', value: '#93C5FD' },
  { label: 'Pale Blue', value: '#BFDBFE' },
  { label: 'Very Pale Blue', value: '#DBEAFE' },
  { label: 'Indigo', value: '#6366F1' },
  { label: 'Light Indigo', value: '#818CF8' },
  { label: 'Lavender', value: '#A5B4FC' },
  { label: 'Pale Lavender', value: '#C7D2FE' },
  { label: 'Very Pale Lavender', value: '#E0E7FF' },
  { label: 'Purple', value: '#8B5CF6' },
  { label: 'Light Purple', value: '#A78BFA' },
  { label: 'Soft Purple', value: '#C4B5FD' },
  { label: 'Very Soft Purple', value: '#DDD6FE' },
  { label: 'Mint Cream', value: '#ECFDF5' },
  { label: 'Jet Black', value: '#1C1917' },
  { label: 'Onyx', value: '#171717' },
  { label: 'Pure Black', value: '#0F0F0F' },
  { label: 'Deep Cyan', value: '#045D56' },
  { label: 'Teal', value: '#0F766E' },
  { label: 'Dark Teal', value: '#134E4A' },
  { label: 'Deep Green', value: '#065F46' },
  { label: 'Olive', value: '#365314' },
  { label: 'Bronze', value: '#B45309' },
  { label: 'Copper', value: '#92400E' },
  { label: 'Burgundy', value: '#7C2D12' },
  { label: 'Deep Maroon', value: '#581C87' },
  { label: 'Plum', value: '#6D28D9' },
  { label: 'Dark Plum', value: '#4C1D95' },
  { label: 'Royal Blue', value: '#1E40AF' },
  { label: 'Cobalt Blue', value: '#1D4ED8' },
  { label: 'Navy Blue', value: '#1E3A8A' },
  { label: 'Steel Blue', value: '#3B82F6' },
  { label: 'Cool Gray', value: '#64748B' },
  { label: 'Warm Gray', value: '#78716C' },
  { label: 'Moss Green', value: '#4D7C0F' },
  { label: 'Forest Green', value: '#065F46' },
  { label: 'Dark Olive', value: '#3F6212' },
  { label: 'Clay', value: '#78350F' },
  { label: 'Success Green', value: '#28a745' },
  { label: 'Warning Yellow', value: '#ffc107' },
  { label: 'Error Red', value: '#dc3545' },
];

const lightModeColors = [
  { label: 'White', value: '#FFFFFF' },
  { label: 'Off-White', value: '#F9FAFB' },
  { label: 'Light Gray', value: '#F3F4F6' },
  { label: 'Gray', value: '#E5E7EB' },
  { label: 'Mid Gray', value: '#D1D5DB' },
  { label: 'Cool Gray', value: '#9CA3AF' },
  { label: 'Warm Gray', value: '#6B7280' },
  { label: 'Charcoal', value: '#4B5563' },
  { label: 'Slate Gray', value: '#374151' },
  { label: 'Dark Slate Gray', value: '#1F2937' },
  { label: 'Light Blue', value: '#BFDBFE' },
  { label: 'Sky Blue', value: '#93C5FD' },
  { label: 'Blue', value: '#60A5FA' },
  { label: 'Light Indigo', value: '#A78BFA' },
  { label: 'Indigo', value: '#818CF8' },
  { label: 'Lavender', value: '#C7D2FE' },
  { label: 'Pale Lavender', value: '#E0E7FF' },
  { label: 'Very Pale Lavender', value: '#E6E9FF' },
  { label: 'Mint', value: '#D1FAE5' },
  { label: 'Light Mint', value: '#A7F3D0' },
  { label: 'Emerald Green', value: '#6EE7B7' },
  { label: 'Light Green', value: '#34D399' },
  { label: 'Green', value: '#10B981' },
  { label: 'Soft Purple', value: '#D6BCFA' },
  { label: 'Light Purple', value: '#C4B5FD' },
  { label: 'Purple', value: '#A78BFA' },
  { label: 'Soft Red', value: '#FCA5A5' },
  { label: 'Light Red', value: '#F87171' },
  { label: 'Red', value: '#EF4444' },
  { label: 'Crimson', value: '#E11D48' },
  { label: 'Light Yellow', value: '#FDE68A' },
  { label: 'Golden Yellow', value: '#FBBF24' },
  { label: 'Goldenrod', value: '#F59E0B' },
  { label: 'Mustard', value: '#F59E0B' },
  { label: 'Bronze', value: '#B45309' },
  { label: 'Copper', value: '#92400E' },
  { label: 'Burgundy', value: '#7C2D12' },
  { label: 'Deep Maroon', value: '#581C87' },
  { label: 'Plum', value: '#6D28D9' },
  { label: 'Deep Plum', value: '#4C1D95' },
  { label: 'Cobalt Blue', value: '#1D4ED8' },
  { label: 'Royal Blue', value: '#1E40AF' },
  { label: 'Navy Blue', value: '#1E3A8A' },
  { label: 'Steel Blue', value: '#3B82F6' },
  { label: 'Moss Green', value: '#4D7C0F' },
  { label: 'Forest Green', value: '#065F46' },
  { label: 'Dark Olive', value: '#3F6212' },
  { label: 'Clay', value: '#78350F' },
  { label: 'Black', value: '#000000' },
  { label: 'Slightly Darker White', value: '#f0f0f0' },
  { label: 'Dark Gray', value: '#333333' },
  { label: 'Very Light Gray', value: '#f9f9f9' },
  { label: 'Success Green', value: '#28a745' },
  { label: 'Warning Yellow', value: '#ffc107' },
  { label: 'Error Red', value: '#dc3545' },
];

const errorColors = [
  { label: 'Red', value: '#EF4444' },
  { label: 'Crimson', value: '#E11D48' },
  { label: 'Light Red', value: '#F87171' },
  { label: 'Soft Red', value: '#FCA5A5' },
  { label: 'Very Light Red', value: '#FECACA' },
  { label: 'Dark Red', value: '#B91C1C' },
  { label: 'Deep Maroon', value: '#7C2D12' },
  { label: 'Rose', value: '#FB7185' },
];

const warningColors = [
  { label: 'Amber', value: '#F59E0B' },
  { label: 'Golden Yellow', value: '#FBBF24' },
  { label: 'Mustard', value: '#D97706' },
  { label: 'Bronze', value: '#B45309' },
  { label: 'Orange', value: '#F97316' },
  { label: 'Dark Amber', value: '#C2410C' },
  { label: 'Yellow', value: '#EAB308' },
  { label: 'Goldenrod', value: '#F59E0B' },
  { label: 'Light Yellow', value: '#FDE68A' },
  { label: 'Soft Yellow', value: '#FCD34D' },
];

const successColors = [
  { label: 'Emerald Green', value: '#10B981' },
  { label: 'Green', value: '#34D399' },
  { label: 'Light Green', value: '#6EE7B7' },
  { label: 'Mint', value: '#A7F3D0' },
  { label: 'Very Light Mint', value: '#D1FAE5' },
  { label: 'Lime', value: '#84CC16' },
  { label: 'Teal', value: '#14B8A6' },
  { label: 'Dark Green', value: '#065F46' },
];

export {
  darkModeColors,
  lightModeColors,
  errorColors,
  warningColors,
  successColors,
};

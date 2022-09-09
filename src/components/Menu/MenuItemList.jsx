import MenuItem from './MenuItem'
import MenuDropDown from './MenuDropDown'
import MenuDivider from './MenuDivider'

export default function MenuItemList ({ items }) {
  return items.map((item, index) => {
    if (Array.isArray(item)) {
      return (
        <MenuItemList
          key={index}
          items={item}
        />
      )
    }

    if (item?.type === 'divider') {
      return (
        <MenuDivider key={index} />
      )
    }

    if (item?.type === 'dropdown') {
      return (
        <MenuDropDown
          key={item.title}
          {...item}
        />
      )
    }

    return <MenuItem
      key={item.title}
      {...item}
    />
  })
}

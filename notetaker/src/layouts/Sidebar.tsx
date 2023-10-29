import {
  TextInput,
  Code,
  UnstyledButton,
  Badge,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  rem,
} from '@mantine/core';
import { IconBulb, IconUser, IconCheckbox, IconSearch, IconPlus } from '@tabler/icons-react';
import {UserButton}  from '../components/UserButton';
import classes from './Sidebar.module.css';
import { Link } from 'react-router-dom';

const links = [
  { icon: IconBulb, label: 'Notes', notifications: 3, to: '/notes' },
  // { icon: IconCheckbox, label: 'Tasks', notifications: 4 },
  // { icon: IconUser, label: 'Contacts' },
];


export function Sidebar() {
  


  return (
    <nav className={classes.navbar}>
      <div className={classes.section}>
        <UserButton />
      </div>

      <TextInput
        placeholder="Search"
        size="xs"
        leftSection={<IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
        rightSectionWidth={70}
        rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
        styles={{ section: { pointerEvents: 'none' } }}
        mb="sm"
      />

      <div className={classes.section}>
        <div className={classes.mainLinks}>
          {links.map((link) => (
            <Link key={link.label} to={link.to} style={{marginLeft: '1rem', paddingLeft: 0, border:"none"}}>
              <UnstyledButton key={link.label} className={classes.mainLink}>
                <div className={classes.mainLinkInner}>
                  <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
                  <span>{link.label}</span>
                </div>
                {link.notifications && (
                  <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
                    {link.notifications}
                  </Badge>
                )}
              </UnstyledButton>
            </Link>
          ))}  
        </div>
      </div>

    </nav>
  );
}
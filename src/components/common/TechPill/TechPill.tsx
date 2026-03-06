import React from 'react';
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiGo,
  SiSharp,
  SiOpenjdk,
  SiShell,
  SiReact,
  SiAngular,
  SiNextdotjs,
  SiVuedotjs,
  SiTailwindcss,
  SiRedux,
  SiBootstrap,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiFastapi,
  SiDotnet,
  SiNpm,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiMariadb,
  SiRedis,
  SiSqlite,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiDocker,
  SiKubernetes,
  SiJenkins,
  SiTerraform,
  SiGooglecloud,
  SiDigitalocean,
  SiGrafana,
  SiHomeassistant,
  SiPlex,
  SiRaspberrypi,
  SiPhp,
  SiSymfony,
  SiElasticsearch,
  SiCypress,
  SiPihole,
  SiJest,
  SiJquery,
} from '@icons-pack/react-simple-icons';
import classes from './TechPill.module.css';

export interface TechItem {
  name: string;
  icon: string;
}

type IconComponent = React.ComponentType<{ size?: number; color?: string }>;

const ICON_MAP: Record<string, IconComponent> = {
  typescript: SiTypescript,
  javascript: SiJavascript,
  python: SiPython,
  go: SiGo,
  csharp: SiSharp,
  sharp: SiSharp,
  java: SiOpenjdk,
  openjdk: SiOpenjdk,
  powershell: SiShell,
  shell: SiShell,
  react: SiReact,
  angular: SiAngular,
  nextdotjs: SiNextdotjs,
  vuedotjs: SiVuedotjs,
  tailwindcss: SiTailwindcss,
  redux: SiRedux,
  bootstrap: SiBootstrap,
  html5: SiHtml5,
  css3: SiCss,
  css: SiCss,
  nodedotjs: SiNodedotjs,
  express: SiExpress,
  nestjs: SiNestjs,
  fastapi: SiFastapi,
  dotnet: SiDotnet,
  npm: SiNpm,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  mariadb: SiMariadb,
  redis: SiRedis,
  sqlite: SiSqlite,
  git: SiGit,
  github: SiGithub,
  githubactions: SiGithubactions,
  docker: SiDocker,
  kubernetes: SiKubernetes,
  jenkins: SiJenkins,
  terraform: SiTerraform,
  googlecloud: SiGooglecloud,
  digitalocean: SiDigitalocean,
  grafana: SiGrafana,
  homeassistant: SiHomeassistant,
  plex: SiPlex,
  raspberrypi: SiRaspberrypi,
  php: SiPhp,
  symfony: SiSymfony,
  elasticsearch: SiElasticsearch,
  cypress: SiCypress,
  pihole: SiPihole,
  jest: SiJest,
  jquery: SiJquery,
};

export function getTechIcon(slug: string): IconComponent | null {
  return ICON_MAP[slug.toLowerCase()] ?? null;
}

interface TechPillProps {
  item: TechItem;
}

const TechPill = ({ item }: TechPillProps) => {
  const IconComp = getTechIcon(item.icon);
  return (
    <div className={classes.techPill}>
      {IconComp && (
        <span className={classes.techPillIcon}>
          <IconComp size={13} color="#ffffff" />
        </span>
      )}
      <span className={classes.techPillName}>{item.name}</span>
    </div>
  );
};

interface TechPillGroupProps {
  items: TechItem[];
  className?: string;
}

export const TechPillGroup = ({ items, className }: TechPillGroupProps) => (
  <div className={`${classes.techPillGroup}${className ? ` ${className}` : ''}`}>
    {items.map((item, idx) => (
      <TechPill key={idx} item={item} />
    ))}
  </div>
);

export default TechPill;

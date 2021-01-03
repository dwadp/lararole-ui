import { createContext } from 'react';
import { createContextualCan } from '@casl/react';
import { defineAbility } from '@casl/ability';
import { AbilityBuilder } from '@casl/ability';

export const AbilityContext = createContext();
export const Can = createContextualCan(AbilityContext.Consumer);

export const updateAbility = (ability, permissions) => {
  const { can, rules } = new AbilityBuilder();

    permissions.forEach(permission => {
      can(permission.action, permission.subject);
    });

    ability.update(rules);
};

export default defineAbility((can, cannot) => {
  can('all', 'users');
  cannot('all', 'roles');
});
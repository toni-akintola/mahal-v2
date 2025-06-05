import { PrismaClient } from "@prisma/client";
import { lessons } from "../data/lessons";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create lessons from static data
  console.log("Creating lessons...");
  for (const lesson of lessons) {
    await prisma.lesson.upsert({
      where: { id: lesson.id.toString() },
      update: {
        title: lesson.title,
        description: lesson.description,
        difficultyLevel: "beginner", // Default for now
        orderIndex: lesson.id,
        category: lesson.category || "general",
        estimatedMinutes: 10,
        xpReward: lesson.exercises.reduce((sum, ex) => sum + ex.xp, 0),
        exercises: lesson.exercises,
        isPublished: true,
      },
      create: {
        id: lesson.id.toString(),
        title: lesson.title,
        description: lesson.description,
        difficultyLevel: "beginner",
        orderIndex: lesson.id,
        category: lesson.category || "general",
        estimatedMinutes: 10,
        xpReward: lesson.exercises.reduce((sum, ex) => sum + ex.xp, 0),
        exercises: lesson.exercises,
        isPublished: true,
      },
    });
  }
  console.log(`Created ${lessons.length} lessons.`);

  // Create comprehensive achievements
  const achievements = [
    // Learning achievements
    {
      key: "first_lesson",
      title: "First Steps",
      description: "Complete your first lesson",
      icon: "BookOpen",
      category: "learning",
      xpReward: 10,
      isProgressive: false,
    },
    {
      key: "lessons_5",
      title: "Getting the Hang of It",
      description: "Complete 5 lessons",
      icon: "BookOpen",
      category: "learning",
      targetValue: 5,
      xpReward: 50,
      isProgressive: true,
    },
    {
      key: "lessons_10",
      title: "Dedicated Learner",
      description: "Complete 10 lessons",
      icon: "BookOpen",
      category: "learning",
      targetValue: 10,
      xpReward: 100,
      isProgressive: true,
    },
    {
      key: "lessons_25",
      title: "Knowledge Seeker",
      description: "Complete 25 lessons",
      icon: "BookOpen",
      category: "learning",
      targetValue: 25,
      xpReward: 250,
      isProgressive: true,
    },
    {
      key: "lessons_50",
      title: "Scholar",
      description: "Complete 50 lessons",
      icon: "GraduationCap",
      category: "learning",
      targetValue: 50,
      xpReward: 500,
      isProgressive: true,
    },
    {
      key: "perfect_score",
      title: "Perfectionist",
      description: "Get 100% on 5 exercises",
      icon: "Target",
      category: "learning",
      targetValue: 5,
      xpReward: 75,
      isProgressive: true,
    },
    {
      key: "perfect_score_10",
      title: "Flawless",
      description: "Get 100% on 10 exercises",
      icon: "Target",
      category: "learning",
      targetValue: 10,
      xpReward: 150,
      isProgressive: true,
    },
    {
      key: "complete_category_greetings",
      title: "Greeter",
      description: "Complete all lessons in the Greetings category",
      icon: "Heart",
      category: "learning",
      xpReward: 100,
      isProgressive: false,
    },
    {
      key: "complete_category_family",
      title: "Family Friend",
      description: "Complete all lessons in the Family category",
      icon: "Users",
      category: "learning",
      xpReward: 100,
      isProgressive: false,
    },
    {
      key: "complete_category_numbers",
      title: "Number Ninja",
      description: "Complete all lessons in the Numbers category",
      icon: "Hash",
      category: "learning",
      xpReward: 100,
      isProgressive: false,
    },

    // Streak achievements
    {
      key: "streak_3",
      title: "Getting Started",
      description: "Maintain a 3-day streak",
      icon: "Flame",
      category: "streak",
      targetValue: 3,
      xpReward: 25,
      isProgressive: true,
    },
    {
      key: "streak_7",
      title: "Week Warrior",
      description: "Maintain a 7-day streak",
      icon: "Flame",
      category: "streak",
      targetValue: 7,
      xpReward: 50,
      isProgressive: true,
    },
    {
      key: "streak_14",
      title: "Fortnight Fighter",
      description: "Maintain a 14-day streak",
      icon: "Flame",
      category: "streak",
      targetValue: 14,
      xpReward: 100,
      isProgressive: true,
    },
    {
      key: "streak_30",
      title: "Monthly Master",
      description: "Maintain a 30-day streak",
      icon: "Crown",
      category: "streak",
      targetValue: 30,
      xpReward: 200,
      isProgressive: true,
    },
    {
      key: "streak_50",
      title: "Consistency Champion",
      description: "Maintain a 50-day streak",
      icon: "Crown",
      category: "streak",
      targetValue: 50,
      xpReward: 350,
      isProgressive: true,
    },
    {
      key: "streak_100",
      title: "Centurion",
      description: "Maintain a 100-day streak",
      icon: "Trophy",
      category: "streak",
      targetValue: 100,
      xpReward: 1000,
      isProgressive: true,
    },

    // Social achievements
    {
      key: "first_friend",
      title: "Making Connections",
      description: "Add your first friend",
      icon: "UserPlus",
      category: "social",
      xpReward: 25,
      isProgressive: false,
    },
    {
      key: "social_butterfly",
      title: "Social Butterfly",
      description: "Add 10 friends",
      icon: "Users",
      category: "social",
      targetValue: 10,
      xpReward: 100,
      isProgressive: true,
    },
    {
      key: "popular",
      title: "Popular",
      description: "Add 25 friends",
      icon: "Users",
      category: "social",
      targetValue: 25,
      xpReward: 250,
      isProgressive: true,
    },
    {
      key: "study_group_member",
      title: "Team Player",
      description: "Join your first study group",
      icon: "Users",
      category: "social",
      xpReward: 50,
      isProgressive: false,
    },
    {
      key: "study_group_leader",
      title: "Leader",
      description: "Create a study group",
      icon: "Crown",
      category: "social",
      xpReward: 100,
      isProgressive: false,
    },

    // Progress achievements
    {
      key: "level_5",
      title: "Rising Star",
      description: "Reach level 5",
      icon: "Star",
      category: "progress",
      targetValue: 5,
      xpReward: 150,
      isProgressive: true,
    },
    {
      key: "level_10",
      title: "Expert",
      description: "Reach level 10",
      icon: "Star",
      category: "progress",
      targetValue: 10,
      xpReward: 300,
      isProgressive: true,
    },
    {
      key: "level_25",
      title: "Master",
      description: "Reach level 25",
      icon: "Crown",
      category: "progress",
      targetValue: 25,
      xpReward: 750,
      isProgressive: true,
    },
    {
      key: "xp_1000",
      title: "XP Collector",
      description: "Earn 1,000 total XP",
      icon: "Zap",
      category: "progress",
      targetValue: 1000,
      xpReward: 100,
      isProgressive: true,
    },
    {
      key: "xp_5000",
      title: "XP Hoarder",
      description: "Earn 5,000 total XP",
      icon: "Zap",
      category: "progress",
      targetValue: 5000,
      xpReward: 500,
      isProgressive: true,
    },

    // Special achievements
    {
      key: "early_bird",
      title: "Early Bird",
      description: "Complete a lesson before 8 AM",
      icon: "Sunrise",
      category: "special",
      xpReward: 50,
      isProgressive: false,
    },
    {
      key: "night_owl",
      title: "Night Owl",
      description: "Complete a lesson after 10 PM",
      icon: "Moon",
      category: "special",
      xpReward: 50,
      isProgressive: false,
    },
    {
      key: "weekend_warrior",
      title: "Weekend Warrior",
      description: "Complete lessons on both Saturday and Sunday",
      icon: "Calendar",
      category: "special",
      xpReward: 75,
      isProgressive: false,
    },
    {
      key: "speed_demon",
      title: "Speed Demon",
      description: "Complete 5 lessons in one day",
      icon: "Zap",
      category: "special",
      targetValue: 5,
      xpReward: 200,
      isProgressive: true,
    },
    {
      key: "beta_tester",
      title: "Beta Pioneer",
      description: "Join Mahal during the beta period",
      icon: "Star",
      category: "special",
      xpReward: 100,
      isProgressive: false,
    },
    {
      key: "culture_enthusiast",
      title: "Culture Enthusiast",
      description: "Complete all cultural context exercises",
      icon: "Globe",
      category: "special",
      xpReward: 300,
      isProgressive: false,
    },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { key: achievement.key },
      update: achievement,
      create: achievement,
    });
  }

  console.log(
    `Database seeded successfully! Created ${achievements.length} achievements.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
